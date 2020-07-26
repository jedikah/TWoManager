import { Field, InputType, ObjectType, ID, Int } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  userName: string;

  @Field()
  login: string;

  @Field()
  password: string;
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
  type?: string;

  @Field({ nullable: true })
  status?: boolean;
}

@InputType()
export class LoginInput {
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
export class User {
  @Field(() => ID)
  userId: number;

  @Field()
  login: string;

  @Field()
  userName: string;

  @Field()
  password: string;

  @Field()
  type: string;

  @Field()
  status: boolean;
}

@ObjectType()
export class LoginOutput {
  @Field()
  token: string;

  @Field()
  type: string;
}

@ObjectType()
export class VerifyToken {
  @Field(() => ID)
  userId: number;

  @Field()
  userName: string;

  @Field()
  login: string;

  @Field()
  type: string;

  @Field()
  status: boolean;

  @Field(() => Int)
  iat: number;

  @Field(() => Int)
  exp: number;
}
