import axios from "axios";

class ItemController {
  getData = async (req, res) => {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const name = req.query.name || "";
    const encoded = encodeURIComponent(name);
    let yugiohDataCache = null;

    try {
      if (!yugiohDataCache) {
        const response = await axios.get(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encoded}`
        );
        yugiohDataCache = response.data.data; // array of cards
      }

      const total = yugiohDataCache.length;
      const startIndex = page * limit;
      const endIndex = (page + 1) * limit;

      const paginatedCards = yugiohDataCache.slice(startIndex, endIndex);

      res.status(200).json({
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: paginatedCards,
      });
    } catch (error) {
      console.error(error.message);
      res
        .status(500)
        .json({ error: "Gagal ambil data kartu dari API Yu-Gi-Oh" });
    }
  };
}

export default ItemController;
