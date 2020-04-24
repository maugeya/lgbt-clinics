import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q

from .models import Location
# from graphql_auth.schema import UserType


class LocationType(DjangoObjectType):
    class Meta:
        model = Location


class Query(graphene.ObjectType):
    locations = graphene.List(LocationType)

    def resolve_locations(self, info):
        return Location.objects.all()
