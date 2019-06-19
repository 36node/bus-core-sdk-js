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
   * @param {string} opt.token token fro authorization
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
     * List all vehicles
     *
     * @param {ListVehiclesRequest} req listVehicles request
     * @returns {Promise<ListVehiclesResponse>} A paged array of vehicles
     */
    listVehicles: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/vehicles`, {
        method: "get",
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
        method: "post",
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
        method: "get",
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
        method: "put",
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
        method: "delete",
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
        method: "get",
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
        method: "post",
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

      return fetch(`${this.base}/line/${lineId}`, {
        method: "get",
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

      return fetch(`${this.base}/line/${lineId}`, {
        method: "put",
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

      return fetch(`${this.base}/line/${lineId}`, {
        method: "delete",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * model's methods
   */
  model = {
    /**
     * 返回车辆品牌列表
     *
     * @param {ListModelsRequest} req listModels request
     * @returns {Promise<ListModelsResponse>} A paged array of vehicle model
     */
    listModels: (req = {}) => {
      const { headers } = req;

      return fetch(`${this.base}/models`, {
        method: "get",
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
        method: "get",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
}
