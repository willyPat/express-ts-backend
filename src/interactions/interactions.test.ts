import request from 'supertest';
import app from '../app';

describe('GET /api/pastors/:pastorId/interactions', () => {
  it('should return paginated interactions for a valid pastor ID', async () => {
    const response = await request(app)
      .get('/api/pastors/123/interactions?page=1&limit=10')
      .expect(200); 

    expect(response.body).toHaveProperty('pastorId', '123');
    expect(response.body).toHaveProperty('total', 50);
    expect(response.body).toHaveProperty('page', 1);
    expect(response.body).toHaveProperty('limit', 10);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeLessThanOrEqual(10);
  });

  it('should return a validation error for invalid page or limit', async () => {
    const response = await request(app)
      .get('/api/pastors/123/interactions?page=abc&limit=10')
      .expect(400); 

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Page must be a positive integer');
  });

  it('should return a validation error for negative limit', async () => {
    const response = await request(app)
      .get('/api/pastors/123/interactions?page=1&limit=-5')
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Limit must be greater than 0');
  });

  it('should return an empty data array for a pastor with no interactions', async () => {
    const response = await request(app)
      .get('/api/pastors/999/interactions?page=1&limit=10')
      .expect(200);

    expect(response.body).toHaveProperty('pastorId', '999');
    expect(response.body).toHaveProperty('total', 0);
    expect(response.body).toHaveProperty('page', 1);
    expect(response.body).toHaveProperty('limit', 10);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(0);
  });
});
