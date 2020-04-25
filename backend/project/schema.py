import graphene
from graphql_auth.schema import UserQuery, MeQuery
import users.schema
import clinic.schema
import location.schema

class Query(clinic.schema.Query, location.schema.Query, UserQuery, MeQuery, graphene.ObjectType):
    pass


class Mutation(clinic.schema.Mutation, users.schema.Mutation, graphene.ObjectType):
   pass

schema = graphene.Schema(query=Query, mutation=Mutation)