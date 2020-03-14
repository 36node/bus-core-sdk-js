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
    let token = this.token;
    if (typeof token === "function") token = token();
    if (token) return `Bearer ${token}`;

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
   * command's methods
   */
  command = {
    /**
     * Send a command
     *
     * @param {SendCommandRequest} req sendCommand request
     * @returns {Promise<SendCommandResponse>} The Command created
     */
    sendCommand: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for sendCommand");

      return fetch(`${this.base}/commands`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * event's methods
   */
  event = {
    /**
     * create (external) event
     *
     * @param {CreateEventRequest} req createEvent request
     * @returns {Promise<CreateEventResponse>} The snapshot created
     */
    createEvent: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for createEvent");

      return fetch(`${this.base}/events`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
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
     * Get vehicles stateHistory
     *
     * @param {GetVehicleStateHistoryRequest} req getVehicleStateHistory request
     * @returns {Promise<GetVehicleStateHistoryResponse>} The vehicle state history
     */
    getVehicleStateHistory: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/stateHistory`, {
        method: "GET",
        query: denormalize(query),
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

      return fetch(`${this.base}/statistics/vehicles`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get statistics for vehicles soh
     *
     * @param {GetVehicleSohStatisticsRequest} req getVehicleSohStatistics request
     * @returns {Promise<GetVehicleSohStatisticsResponse>} Statistics of an vehicle
     */
    getVehicleSohStatistics: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/statistics/vehicles/soh`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get statistics for vehicles air
     *
     * @param {GetVehicleAirStatisticsRequest} req getVehicleAirStatistics request
     * @returns {Promise<GetVehicleAirStatisticsResponse>} Statistics of an vehicle air
     */
    getVehicleAirStatistics: (req = {}) => {
      const { query, headers } = req;

      if (!query) throw new Error("query is required for vehicle");

      return fetch(`${this.base}/statistics/vehicles/air`, {
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
      const { query, headers } = req;

      return fetch(`${this.base}/producers`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * park's methods
   */
  park = {
    /**
     * List all parks with filters
     *
     * @param {ListParksRequest} req listParks request
     * @returns {Promise<ListParksResponse>} A paged array of parks
     */
    listParks: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/parks`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * banci's methods
   */
  banci = {
    /**
     * List all bancis with filters
     *
     * @param {ListBancisRequest} req listBancis request
     * @returns {Promise<ListBancisResponse>} A paged array of parks
     */
    listBancis: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/bancis`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Delete a banci by id
     *
     * @param {DeleteBanciRequest} req deleteBanci request
     * @returns {Promise<DeleteBanciResponse>} banci deleted
     */
    deleteBanci: (req = {}) => {
      const { banciId, headers } = req;

      if (!banciId) throw new Error("banciId is required for deleteBanci");

      return fetch(`${this.base}/bancis/${banciId}`, {
        method: "DELETE",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * warning's methods
   */
  warning = {
    /**
     * List all warnings
     *
     * @param {ListWarningsRequest} req listWarnings request
     * @returns {Promise<ListWarningsResponse>} A paged array of warnings
     */
    listWarnings: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/warnings`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * 获取车辆最新的warning
     *
     * @param {ListLatestWarningsRequest} req listLatestWarnings request
     * @returns {Promise<ListLatestWarningsResponse>} A paged array of warnings
     */
    listLatestWarnings: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/warnings/latest`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * weather's methods
   */
  weather = {
    /**
     * Get weather
     *
     * @param {GetWeatherRequest} req getWeather request
     * @returns {Promise<GetWeatherResponse>} Current weather of location
     */
    getWeather: (req = {}) => {
      const { date, query, headers } = req;

      if (!date) throw new Error("date is required for getWeather");

      return fetch(`${this.base}/weather/${date}`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get weather last 24 hours
     *
     * @param {GetWeatherLast24HoursRequest} req getWeatherLast24Hours request
     * @returns {Promise<GetWeatherLast24HoursResponse>} Last 24 hours weather of location
     */
    getWeatherLast24Hours: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/weatherLast24Hours`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
  /**
   * push's methods
   */
  push = {
    /**
     * Get push setting by userId
     *
     * @param {GetPushSetRequest} req getPushSet request
     * @returns {Promise<GetPushSetResponse>} The push setting with given userId
     */
    getPushSet: (req = {}) => {
      const { userId, query, headers } = req;

      if (!userId) throw new Error("userId is required for getPushSet");
      if (!query) throw new Error("query is required for push");

      return fetch(`${this.base}/push/setting/${userId}`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Update push setting
     *
     * @param {UpdatePushSetRequest} req updatePushSet request
     * @returns {Promise<UpdatePushSetResponse>} The pust setting
     */
    updatePushSet: (req = {}) => {
      const { userId, headers, body } = req;

      if (!userId) throw new Error("userId is required for updatePushSet");
      if (!body) throw new Error("requetBody is required for updatePushSet");

      return fetch(`${this.base}/push/setting/${userId}`, {
        method: "PATCH",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Get push device by userId
     *
     * @param {GetPushDeviceRequest} req getPushDevice request
     * @returns {Promise<GetPushDeviceResponse>} The push device with given userId
     */
    getPushDevice: (req = {}) => {
      const { userId, query, headers } = req;

      if (!userId) throw new Error("userId is required for getPushDevice");
      if (!query) throw new Error("query is required for push");

      return fetch(`${this.base}/push/device/${userId}`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Update device
     *
     * @param {UpdatePushDeviceRequest} req updatePushDevice request
     * @returns {Promise<UpdatePushDeviceResponse>} The pust device
     */
    updatePushDevice: (req = {}) => {
      const { userId, headers, body } = req;

      if (!userId) throw new Error("userId is required for updatePushDevice");
      if (!body) throw new Error("requetBody is required for updatePushDevice");

      return fetch(`${this.base}/push/device/${userId}`, {
        method: "PATCH",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * List all setting
     *
     * @param {ListPushSetRequest} req listPushSet request
     * @returns {Promise<ListPushSetResponse>} A paged array of setting
     */
    listPushSet: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/push/setting`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * List all devices
     *
     * @param {ListPushDeviceRequest} req listPushDevice request
     * @returns {Promise<ListPushDeviceResponse>} A paged array of devices
     */
    listPushDevice: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/push/device`, {
        method: "GET",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
}
