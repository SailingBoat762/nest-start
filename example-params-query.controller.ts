import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('api/v1/products')
export class ExampleParamsQueryController {

  // === Params 参数示例 ===

  // GET /api/v1/products/123
  @Get(':id')
  getProductById(@Param('id') id: string) {
    return {
      type: 'path param',
      id,
      message: `获取产品 ${id} 的详细信息`
    };
  }

  // GET /api/v1/products/123/reviews/456
  @Get(':productId/reviews/:reviewId')
  getReviewById(
    @Param('productId') productId: string,
    @Param('reviewId') reviewId: string
  ) {
    return {
      type: 'multiple path params',
      productId,
      reviewId,
      message: `获取产品 ${productId} 的评论 ${reviewId}`
    };
  }

  // === Query 参数示例 ===

  // GET /api/v1/products?category=electronics&sort=desc&page=1&limit=10
  @Get()
  getProducts(@Query() query: any) {
    return {
      type: 'query params',
      category: query.category,
      sort: query.sort,
      page: query.page,
      limit: query.limit,
      message: '根据查询条件筛选产品'
    };
  }

  // GET /api/v1/products/search?q=laptop&price=min-1000,max-5000
  @Get('search')
  searchProducts(
    @Query('q') keyword: string,
    @Query('price') priceRange: string,
    @Query('brand') brand?: string
  ) {
    return {
      type: 'specific query params',
      keyword,
      priceRange,
      brand,
      message: `搜索关键词: ${keyword}`
    };
  }

  // === Params + Query 组合示例 ===

  // GET /api/v1/products/123/reviews?sort=newest&page=1
  @Get(':id/reviews')
  getProductReviews(
    @Param('id') productId: string,
    @Query() query: any
  ) {
    return {
      type: 'params + query',
      productId,
      sort: query.sort,
      page: query.page,
      message: `获取产品 ${productId} 的评论列表`
    };
  }

  // GET /api/v1/products/123/compare?with=456,789&features=all
  @Get(':id/compare')
  compareProducts(
    @Param('id') productId: string,
    @Query('with') compareIds: string,
    @Query('features') features?: string
  ) {
    return {
      type: 'params + complex query',
      currentProductId: productId,
      compareWith: compareIds.split(','),
      features,
      message: `比较产品 ${productId} 与其他产品`
    };
  }
}