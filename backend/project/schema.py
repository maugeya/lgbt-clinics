import graphene
from graphql_auth.schema import UserQuery, MeQuery
from users.schema import AuthMutation
import clinic.schema

class Query(clinic.schema.Query, UserQuery, MeQuery, graphene.ObjectType):
    pass


class Mutation(AuthMutation, graphene.ObjectType):
   pass

schema = graphene.Schema(query=Query, mutation=Mutation)