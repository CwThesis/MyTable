const awsmobile = {
  aws_project_region: "us-east-1",
  aws_cognito_identity_pool_id:
    "us-east-1:4a87e8d5-3b2d-4ca0-9159-9c70482a2273",
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_HgmJAYO5D",
  aws_user_pools_web_client_id: "9fiv9o1j5qnj2boklpiea2155",
  oauth: {},
  aws_cognito_username_attributes: ["EMAIL"],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ["EMAIL"],
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: [],
  },
  aws_cognito_verification_mechanisms: ["EMAIL"],
  aws_dynamodb_all_tables_region: "us-east-1",
  aws_dynamodb_table_schemas: [
    {
      tableName: "restaurants-dev",
      region: "us-east-1",
    },
  ],
  aws_cloud_logic_custom: [
    {
      name: "apiMyTable",
      endpoint: "https://slqrleg0j1.execute-api.us-east-1.amazonaws.com/dev",
      region: "us-east-1",
    },
  ],
};
export default awsmobile;
