import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = 12;
  const offset = (page - 1) * limit;
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'newest';

  let orderBy = 'created_at DESC';
  if (sort === 'oldest') orderBy = 'created_at ASC';
  else if (sort === 'prompt_asc') orderBy = 'prompt ASC';
  else if (sort === 'prompt_desc') orderBy = 'prompt DESC';

  const query = `
    SELECT * FROM generated_images
    WHERE prompt ILIKE $1
    ORDER BY ${orderBy}
    LIMIT $2 OFFSET $3
  `;

  const countQuery = `
    SELECT COUNT(*) FROM generated_images
    WHERE prompt ILIKE $1
  `;

  try {
    const [images, countResult] = await Promise.all([
      pool.query(query, [`%${search}%`, limit, offset]),
      pool.query(countQuery, [`%${search}%`]),
    ]);

    const totalImages = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalImages / limit);

    return NextResponse.json({
      images: images.rows,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
  }

  try {
    await pool.query('DELETE FROM generated_images WHERE id = $1', [id]);
    return NextResponse.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

