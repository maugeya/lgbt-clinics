import graphene
import graphql_jwt
from graphql_auth.schema import UserQuery, MeQuery
import users.schema
import clinic.schema
import location.schema

class Query(clinic.schema.Query, location.schema.Query, UserQuery, MeQuery, graphene.ObjectType):
    pass


class Mutation(clinic.schema.Mutation, users.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)