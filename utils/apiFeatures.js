class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObject = { ...this.queryString };
    const excludedFields = ['sort', 'page', 'limit', 'fields', 'search'];
    excludedFields.forEach((el) => delete queryObject[el]);

    // 1B) ADVANCED FILTERING
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    // page=3&limit=10, page 1 --> 1 - 10, page 2 --> 11 - 20, page 3 --> 21 - 30
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  search() {
    if (this.queryString.search) {
      const search = this.queryString.search.split(',').join(' ');
      this.query.find({
        name: { $regex: search, $options: 'i' }, // case-insensitive match
      });
    }
    return this;
  }
}

module.exports = APIFeatures;
