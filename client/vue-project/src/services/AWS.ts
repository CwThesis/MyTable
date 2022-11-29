/* eslint-disable */
const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_dynamodb_all_tables_region": "us-east-1",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "Restaurants-dev",
            "region": "us-east-1"
        }
    ],
    "aws_cognito_identity_pool_id": "us-east-1:06f41363-762c-4505-9ebb-12fccfc43c7f",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_fJoHmHAuf",
    "aws_user_pools_web_client_id": "6vdtecd429075cq9cp19ob6f84",
    "oauth": {},
    "aws_cognito_username_attributes": [
        "EMAIL"
    ],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_cloud_logic_custom": [
        {
            "name": "myTableApi",
            "endpoint": "https://dd30g6mi2g.execute-api.us-east-1.amazonaws.com/dev",
            "region": "us-east-1"
        }
    ]
};
export default awsmobile;



