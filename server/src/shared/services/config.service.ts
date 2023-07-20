import { Injectable } from "@nestjs/common";

@Injectable()
export class ConfigService {
  constructor() {
    // Replace \\n with \n to support multiline strings
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName].replace(/\\n/g, "\n");
    }
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === "development";
  }

  get isProduction(): boolean {
    return this.nodeEnv === "production";
  }

  public get(key: string): string {
    return process.env[key];
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  get nodeEnv(): string {
    return this.get("NODE_ENV") || "development";
  }
}
