# corezoid-http-bridge
Reverse-Double Callback Corezoid Sync API.

## How it works?
### Flow
1. Request `/{{process_id}}/{{webhook_id}}`
2. Corezoid JSON Callback Trigger
3. Corezoid Flow
4. Corezoid post return data back by `{{return_url}}` that provided in step 2
### Example 
[Corezoid Hosted Page](https://corezoid-ssr-demo.herokuapp.com/779994/91adf00a06b602c1b883dd661e02c783f7b4f3b8/)
