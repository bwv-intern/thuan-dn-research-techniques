import { IsString, IsEmail, MinLength, MaxLength, IsNotEmpty, ValidateIf, Matches } from 'class-validator';

export class UserDTO {
  @IsEmail()
  @IsNotEmpty()
  public email!: string;

  @IsString()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  public password!: string;

  @ValidateIf((o) => o.password)
  @IsString()
  @MinLength(6)
  public retypePassword?: string;

  @IsString()
  @MinLength(3, {
    message: 'Full name must be at least 3 characters long',
  })
  @MaxLength(100, {
    message: 'Full name cannot exceed 100 characters',
  })
  @Matches(/^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/, {
    message: 'Full name must contain only Japanese characters (Hiragana, Katakana, Kanji)',
  })
  public fullName!: string;

  validatePasswordMatch() {
    if (this.password !== this.retypePassword) {
      throw new Error('Password and retypePassword do not match');
    }
  }
}
