// functions/src/types/serviceAccountKey.json.d.ts
declare module "../../service-account-key.json" {
  const value: {
    type: string;
    project_id: string;
    private_key_id: string;
    private_key: string;
    client_email: string;
    client_id: string;
    auth_uri: string;
    token_uri: string;
    auth_provider_x509_cert_url: string;
    client_x509_cert_url: string;
    universe_domain?: string;
  };
  export default value;
}
