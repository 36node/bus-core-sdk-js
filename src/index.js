import fetch from "@36node/fetch";
import { denormalize } from "@36node/query-normalizr";

export default class SDK {
  /**@type {string} **/
  base;
  /**@type {string} **/
  token;

  /**
   * Sdk auth
   *
   * @returns {string} auth header
   * */
  get auth() {
    if (this.token) {
      return `Bearer ${this.token}`;
    }

    return "";
  }

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token for authorization
   */
  constructor(opt = {}) {
    this.base = opt.base || "";
    this.token = opt.token || "";
  }

  /**
   * vehicle's methods
   */
  vehicle = {
    /**
     * List all vehicles with filters
     *
     * @param {ListVehiclesRequest} req listVehicles request
     * @returns {Promise<ListVehiclesResponse>} A paged array of vehicles
     */
    listVehicles: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/vehicles`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Create a vehicle
     *
     * @param {CreateVehicleRequest} req createVehicle request
     * @returns {Promise<CreateVehicleResponse>} The Vehicle created
     */
    createVehicle: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for createVehicle");

      return fetch(`${this.base}/vehicles`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get vehicle by vin(id)
     *
     * @param {GetVehicleRequest} req getVehicle request
     * @returns {Promise<GetVehicleResponse>} The vehicle with given vin
     */
    getVehicle: (req = {}) => {
      const { vehicleId, headers } = req;

      if (!vehicleId) throw new Error("vehicleId is required for getVehicle");

      return fetch(`${this.base}/vehicles/${vehicleId}`, {
        method: "GET",
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Update a vehicle by id
     *
     * @param {UpdateVehicleRequest} req updateVehicle request
     * @returns {Promise<UpdateVehicleResponse>} The vehicle
     */
    updateVehicle: (req = {}) => {
      const { vehicleId, headers, body } = req;

      if (!vehicleId)
        throw new Error("vehicleId is required for updateVehicle");
      if (!body) throw new Error("requetBody is required for updateVehicle");

      return fetch(`${this.base}/vehicles/${vehicleId}`, {
        method: "PATCH",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     *
     *
     * @param {DeleteVehicleRequest} req deleteVehicle request
     * @returns {Promise<DeleteVehicleResponse>} vehicle deleted
     */
    deleteVehicle: (req = {}) => {
      const { vehicleId, headers } = req;

      if (!vehicleId)
        throw new Error("vehicleId is required for deleteVehicle");

      return fetch(`${this.base}/vehicles/${vehicleId}`, {
        method: "DELETE",
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get statistics for vehicles
     *
     * @param {GetStatisticsRequest} req getStatistics request
     * @returns {Promise<GetStatisticsResponse>} Statistics of an vehicle
     */
    getStatistics: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/statistics/vehilce`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * line's methods
   */
  line = {
    /**
     * List all lines
     *
     * @param {ListLinesRequest} req listLines request
     * @returns {Promise<ListLinesResponse>} A paged array of lines
     */
    listLines: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/lines`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Create a line
     *
     * @param {CreateLineRequest} req createLine request
     * @returns {Promise<CreateLineResponse>} The Vehicle created
     */
    createLine: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for createLine");

      return fetch(`${this.base}/lines`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get line by id
     *
     * @param {GetLineRequest} req getLine request
     * @returns {Promise<GetLineResponse>} The line with given id
     */
    getLine: (req = {}) => {
      const { lineId, headers } = req;

      if (!lineId) throw new Error("lineId is required for getLine");

      return fetch(`${this.base}/lines/${lineId}`, {
        method: "GET",
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Update a line by id
     *
     * @param {UpdateLineRequest} req updateLine request
     * @returns {Promise<UpdateLineResponse>} The line
     */
    updateLine: (req = {}) => {
      const { lineId, headers, body } = req;

      if (!lineId) throw new Error("lineId is required for updateLine");
      if (!body) throw new Error("requetBody is required for updateLine");

      return fetch(`${this.base}/lines/${lineId}`, {
        method: "PATCH",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Delete a line by id
     *
     * @param {DeleteLineRequest} req deleteLine request
     * @returns {Promise<DeleteLineResponse>} line deleted
     */
    deleteLine: (req = {}) => {
      const { lineId, headers } = req;

      if (!lineId) throw new Error("lineId is required for deleteLine");

      return fetch(`${this.base}/lines/${lineId}`, {
        method: "DELETE",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * producer's methods
   */
  producer = {
    /**
     * 返回生产商列表
     *
     * @param {ListProducersRequest} req listProducers request
     * @returns {Promise<ListProducersResponse>} A paged array of vehicle producer
     */
    listProducers: (req = {}) => {
      const { headers } = req;

      return fetch(`${this.base}/producers`, {
        method: "GET",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
}
