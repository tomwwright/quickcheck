import {
  ObjectType as GraphQLObjectType,
  InputType as GraphQLInputType,
  Field as GraphQLField
} from "type-graphql";
import { Notification as NotificationType } from "quickcheck";

@GraphQLObjectType()
@GraphQLInputType("NotificationInput")
export class Notification implements NotificationType {
  @GraphQLField()
  name: string;

  @GraphQLField()
  email: string;
}
