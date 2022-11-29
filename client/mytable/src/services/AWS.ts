const awsmobile = {
  aws_project_region: "us-east-1",
  aws_cognito_identity_pool_id: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  aws_cognito_region: "us-east-1",
  aws_user_pools_id: "us-east-1_HgmJAYO5D",
  aws_user_pools_web_client_id: import.meta.env.VITE_USER_POOLS_WEB_CLIENT_ID,
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
      endpoint: import.meta.env.VITE_AWS_CLOUD_LOGIC_ENDPOINT,
      region: "us-east-1",
    },
  ],
};
export default awsmobile;
