import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { CategoriesService } from '../services/categories.service';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { PostsService } from '../services/posts.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Get(':id/posts')
  getPostsByCategoryId(@Param('id', ParseIntPipe) categoryId: number) {
    return this.postsService.getPostsByCategoryId(categoryId);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() UpdateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, UpdateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}
