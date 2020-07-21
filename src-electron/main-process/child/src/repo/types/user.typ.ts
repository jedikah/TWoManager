import { Field, InputType, ObjectType } from '@nestjs/graphql';

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
  @Field()
  userId: number;

  @Field()
  userName: string;

  @Field()
  login: string;
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
  @Field()
  userId?: number;

  @Field()
  login: string;

  @Field()
  userName: string;
}
