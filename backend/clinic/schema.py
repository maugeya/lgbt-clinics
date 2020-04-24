import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q

from .models import Clinic
from location.schema import LocationType
# from graphql_auth.schema import UserType


class ClinicType(DjangoObjectType):
    class Meta:
        model = Clinic


class Query(graphene.ObjectType):
    clinics = graphene.List(ClinicType, search=graphene.String())
    locations = graphene.List(LocationType)

    def resolve_clinics(self, info, search=None):
        if search:
            filter = (
                Q(name__icontains=search) |
                Q(clinic_code__icontains=search) |
                Q(address_1__icontains=search) |
                Q(address_2__icontains=search) |
                Q(town__icontains=search) |
                Q(county__icontains=search)|
                Q(postcode__icontains=search) |
                Q(url__icontains=search)
            )
            return Clinic.objects.filter(filter)
        return Clinic.objects.all()
