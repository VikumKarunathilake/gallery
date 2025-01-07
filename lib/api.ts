// lib/api.ts

import pool from './db'; // Import your PostgreSQL connection

export async function getImages(page: number, search: string, sort: string) {
    const itemsPerPage = 10;
  
    const query = `
      SELECT * FROM generated_images
      WHERE prompt ILIKE $1
      ORDER BY ${sort === 'newest' ? 'created_at DESC' : 'created_at ASC'}
      LIMIT $2 OFFSET $3;
    `;
  
    const values = [`%${search}%`, itemsPerPage, (page - 1) * itemsPerPage];
  
    try {
      const { rows } = await pool.query(query, values);
  
      const countQuery = 'SELECT COUNT(*) FROM generated_images WHERE prompt ILIKE $1';
      const countResult = await pool.query(countQuery, [`%${search}%`]);
      const totalImages = parseInt(countResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalImages / itemsPerPage);
  
      return {
        images: rows,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      console.error('Error fetching images:', error);
      throw new Error('Error fetching images');
    }
  }
  
