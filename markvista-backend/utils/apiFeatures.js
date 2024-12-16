// API Features
class APIFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }

  filter() {
    // Query Filtering
    const queryObj = { ...this.queryObj };
    const excludedFields = ["sort", "page", "limit", "fields"];
    excludedFields.forEach((query) => delete queryObj[query]);

    // Query Advance Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  sort() {
    if (this.queryObj.sort) {
      const sortBy = this.queryObj.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  projection() {
    // Field Projection
    if (this.queryObj.fields) {
      const fields = this.queryObj.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else this.query = this.query.select("-__v");

    return this;
  }

  async pagination() {
    // Pagination
    const page = this.queryObj.page * 1 || 1;
    const limit = this.queryObj.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
