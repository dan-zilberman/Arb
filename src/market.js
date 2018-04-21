class Entry {
  constructor(limit, qty) {
    this._limit = limit;
    this._qty = qty;
  }

  get Limit() { return this._limit; }

  get Qty() { return this._qty; }
}


class Market {
  constructor(bids, asks) {
    this._bids = bids;
    this._asks = asks;
  }

  get Bids() { return this._bids; }

  get Asks() { return this._asks; }
}


module.exports = {Market: Market, Entry: Entry};
