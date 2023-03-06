export type Asset = {
  id: number;
  token_id: string;
  asset_contract: {
    address: string;
  };
  image_url: string;
  name: string;
  description: string;
  last_sale?: {
    total_price: string;
    transaction: {
      block_hash: string;
      block_number: string;
      from_account: {
        address: string;
        user: {
          username: string;
        };
      };
      id: string;
      timestamp: string;
    };
  };
};

export type Owner = {
  owner: {
    user: {
      username: string;
    };
    address: string;
  };
};
