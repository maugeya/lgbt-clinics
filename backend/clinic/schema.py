import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.db.models import Q

from .models import Clinic, Like
from location.schema import LocationType
from users.models import CustomUser
from users.schema import UserType


class ClinicType(DjangoObjectType):
    id = graphene.Int()
    name = graphene.String()
    clinic_code = graphene.String()
    address_1 = graphene.String()
    address_2 = graphene.String()
    town = graphene.String()
    county = graphene.String()
    postcode = graphene.String()
    url = graphene.String()
    latitude = graphene.Int()
    longitude = graphene.Int()

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


class CreateLike(graphene.Mutation):
    user = graphene.Field(UserType)
    clinic = graphene.Field(ClinicType)

    class Arguments:
        clinic_id = graphene.Int(required=True)

    def mutate(self, info, clinic_id):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('Login to like clinics.')

        clinic = Clinic.objects.get(id=clinic_id)
        if not clinic:
            raise GraphQLError('Cannot find a clinic with the given ID')
        
        if Like.objects.get(clinic_id=clinic_id, user=user):
            raise GraphQLError('Clinic already liked by user')

        Like.objects.create(
            user=user,
            clinic=clinic
        )

        return CreateLike(user=user, clinic=clinic)


class Mutation(graphene.ObjectType):
    create_like = CreateLike.Field()
