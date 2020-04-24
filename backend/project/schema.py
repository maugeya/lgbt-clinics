import graphene
from graphql_auth.schema import UserQuery, MeQuery
from users.schema import AuthMutation
import clinic.schema
import location.schema

class Query(clinic.schema.Query, location.schema.Query, UserQuery, MeQuery, graphene.ObjectType):
    pass


class Mutation(clinic.schema.Mutation, AuthMutation, graphene.ObjectType):
   pass

schema = graphene.Schema(query=Query, mutation=Mutation)