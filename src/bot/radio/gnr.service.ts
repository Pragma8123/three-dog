import { InjectDiscordClient } from '@discord-nestjs/core';
import {
  AudioPlayer,
  AudioPlayerStatus,
  AudioResource,
  createAudioPlayer,
  createAudioResource,
  DiscordGatewayAdapterCreator,
  getVoiceConnection,
  getVoiceConnections,
  joinVoiceChannel,
  NoSubscriberBehavior,
} from '@discordjs/voice';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client } from 'discord.js';

@Injectable()
export class GNRService implements OnModuleInit {
  private readonly logger = new Logger(GNRService.name);
  private gnrPlayer: AudioPlayer;
  private gnrTrack: AudioResource;

  constructor(@InjectDiscordClient() private readonly client: Client) {}

  onModuleInit(): void {
    this.gnrTrack = this.loadTrack();
    this.gnrPlayer = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play, // Always play our audio, even with no subs
        maxMissedFrames: Infinity, // Don't stop playing if we miss some frames
      },
    });
    this.gnrPlayer.setMaxListeners(Infinity); // Allow for infinite listeners
    this.gnrPlayer.play(this.gnrTrack);

    // Restart once our track ends
    this.gnrPlayer.on(AudioPlayerStatus.Idle, () => {
      this.gnrTrack = this.loadTrack();
      this.gnrPlayer.play(this.gnrTrack);
    });
    this.logger.log('Radio initialized!');
  }

  tuneIn(
    channelId: string,
    guildId: string,
    adapterCreator: DiscordGatewayAdapterCreator,
  ): void {
    const connection = joinVoiceChannel({
      channelId,
      guildId,
      adapterCreator,
    });
    if (!connection) {
      throw new Error('Could not establish a connection!');
    }
    connection.subscribe(this.gnrPlayer);
  }

  tuneOut(guildId: string): boolean {
    const connection = getVoiceConnection(guildId);
    const hasConnection = !!connection;
    if (hasConnection) connection.destroy();
    return hasConnection;
  }

  isPlayingInGuild(guildId: string): boolean {
    return !!getVoiceConnection(guildId);
  }

  getTotalConnections(): number {
    return getVoiceConnections().size;
  }

  private loadTrack(): AudioResource {
    return createAudioResource('gnr.ogg');
  }
}
