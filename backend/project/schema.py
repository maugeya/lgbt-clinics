import graphene
import graphql_jwt
import users.schema
import clinic.schema
import location.schema

class Query(users.schema.Query, clinic.schema.Query, location.schema.Query, graphene.ObjectType):
    pass


class Mutation(clinic.schema.Mutation, users.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)