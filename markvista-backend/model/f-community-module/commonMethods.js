// Define methods for like/dislike interactions
const InteractionMixin = {
  addLike(userId) {
    if (!this.likes.includes(userId)) {
      this.likes.push(userId);
      this.dislikes = this.dislikes.filter(
        (id) => id.toString() !== userId.toString()
      );
    }
  },
  addDislike(userId) {
    if (!this.dislikes.includes(userId)) {
      this.dislikes.push(userId);
      this.likes = this.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    }
  },
};

export default InteractionMixin;
