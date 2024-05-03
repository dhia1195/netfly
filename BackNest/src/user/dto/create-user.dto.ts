/* eslint-disable prettier/prettier */
export class CreateUserDto {
  readonly name: string;
  readonly number: number;
  readonly birthD: Date;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly state: boolean;
}