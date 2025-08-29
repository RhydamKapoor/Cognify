from marshmallow import Schema, fields, validate;
from enum import Enum;

class Role(Enum):
    ADMIN = "admin";
    USER = "user";

class UserSchema(Schema):
    name = fields.Str(required=True);
    email = fields.Email(required=True);
    password = fields.Str(required=False);
    role = fields.Str(
        validate=validate.OneOf([role.value for role in Role]),
        load_default=Role.USER.value  # instead of default
    )
    provider = fields.Str(required=True);
    createdAt = fields.DateTime(dump_only=True);
    updatedAt = fields.DateTime(dump_only=True);