export class QueryBuilder {
  private readonly querry = [];

  match(data: object): QueryBuilder {
    this.querry.push({
      $match: data,
    });
    return this;
  }

  group(data: object): QueryBuilder {
    this.querry.push({
      $group: data,
    });
    return this;
  }

  sort(data: object): QueryBuilder {
    this.querry.push({
      $sort: data,
    });
    return this;
  }

  unwind(data: object): QueryBuilder {
    this.querry.push({
      $unwind: data,
    });
    return this;
  }

  lookup(data: object): QueryBuilder {
    this.querry.push({
      $lookup: data,
    });
    return this;
  }

  addFields(data: object): QueryBuilder {
    this.querry.push({
      $addFields: data,
    });
    return this;
  }

  project(data: object): QueryBuilder {
    this.querry.push({
      $project: data,
    });
    return this;
  }

  build(): object[] {
    return this.querry;
  }
}
