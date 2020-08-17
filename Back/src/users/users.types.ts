import { Field, InputType, ObjectType, ID, Int } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  userName: string;

  @Field()
  login: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  photo?: string;
}

@ObjectType()
export class UserOutput {
  @Field(() => ID)
  userId: number;

  @Field()
  userName: string;

  @Field()
  login: string;

  @Field({ nullable: true })
  photo?: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  status?: boolean;
}

@InputType()
export class LogInInput {
  @Field()
  login: string;

  @Field()
  password: string;
}

@ObjectType()
export class TokenCreator {
  @Field(() => ID)
  userId?: number;

  @Field()
  login: string;

  @Field()
  userName: string;
}

@ObjectType()
export class LogInOutput {
  @Field({ nullable: true })
  token: string;

  @Field({ nullable: true })
  type: string;
}

@ObjectType()
export class CheckTokenOutput {
  @Field(() => ID)
  userId: number;

  @Field()
  userName: string;

  @Field()
  login: string;

  @Field({ nullable: true })
  photo: string;

  @Field()
  type: string;

  @Field()
  status: boolean;

  @Field(() => Int)
  iat: number;

  @Field(() => Int)
  exp: number;
}
