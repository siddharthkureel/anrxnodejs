CREATE TABLE products (
	id serial PRIMARY KEY,
	title VARCHAR ( 255 ),
	body_html VARCHAR ( 500 ),
	vendor VARCHAR ( 255 ),
    product_type VARCHAR ( 50 ),
	created_at VARCHAR ( 50 ),
	handle VARCHAR ( 255 ),
    updated_at VARCHAR ( 50 ),
	published_at VARCHAR ( 50 ),
	status VARCHAR ( 50 ),
    published_scope VARCHAR ( 50 ),
	tags VARCHAR( 50 ),
	admin_graphql_api_id VARCHAR ( 50 ),
	variants json ARRAY,
    options json ARRAY,
	images json ARRAY,
	image json
);