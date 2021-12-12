import express, { Application, Response, Request } from 'express';
import bodyParser from 'body-parser';
const pool = require('./db');

const app: Application = express();
app.use(bodyParser.json())

app.get('/products', (req: Request, res: Response) => {
  pool.query('SELECT * FROM products', (error: any, results: any) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

app.get('/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM products WHERE id = $1', [id], (error: any, results: any) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
});

app.post('/products', async (req: Request, res: Response) => {
  const { title, body_html, vendor, product_type, created_at, handle, status, published_at,
    updated_at, tags, admin_graphql_api_id, variants, options, images, image
  } = req.body;

  await pool.query(
    `INSERT INTO products (title, body_html, vendor, product_type, created_at, handle, status, published_at, updated_at, tags, admin_graphql_api_id, variants, options, images, image) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`, 
    [title, body_html, vendor, product_type, created_at, handle, status, published_at, updated_at, tags, admin_graphql_api_id, variants, options, images, image], (error: any, results: any) => {
    if (error) { 
      throw error
    }
    res.status(201).send(results)
  })
});

app.put('/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const { title, body_html, vendor, product_type, created_at, handle, status, published_at,
    updated_at, tags, admin_graphql_api_id, variants, options, images, image
  } = req.body;

  pool.query(
    `UPDATE products SET title = $1, body_html = $2 , vendor = $3, product_type = $4, created_at = $5, 
    handle = $6, status = $7, published_at = $8, updated_at = $9, tags = $10, admin_graphql_api_id = $11,
    variants = $12, options = $13, images = $14, image = $15
    WHERE id = $16`,
    [title, body_html, vendor, product_type, created_at, handle, status, published_at, updated_at, tags, admin_graphql_api_id, variants, options, images, image, id],
    (error: any, results: any) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    } 
  )
});

app.delete('/products/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  pool.query('DELETE FROM products WHERE id = $1', [id], (error: any, results: any) => {
    if (error) {
      throw error
    }
    res.status(200).send(`Product deleted with ID: ${id}`)
  })
});

app.listen(5000, () => console.log('server running'));