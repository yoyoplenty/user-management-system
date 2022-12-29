export class BaseService<Entity, CreateDto, UpdateDto> {
  private model;

  constructor(model) {
    this.model = model;
  }

  async create(createData: CreateDto): Promise<Entity> {
    return await this.model.create(createData);
  }

  async getAll(): Promise<Entity[]> {
    return await this.model.paginate({});
  }

  async getByNameOrCode(query): Promise<Entity> {
    return await this.model.findOne({
      $or: [{ name: query.name }, { code: query.code }],
    });
  }

  async getById(id: string): Promise<Entity> {
    return await this.model.findById(id);
  }

  async update(id: string, updateData: any | UpdateDto): Promise<Entity> {
    // console.log(updateData);

    return await this.model.findByIdAndUpdate(id, updateData);
  }

  async delete(id: string): Promise<Entity> {
    return await this.model.findByIdAndDelete(id);
  }
}
