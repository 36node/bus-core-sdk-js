export = SDK;

declare class SDK {
  constructor(opts?: SDK.Options);

  base: string;
  token: string;
  auth: string;

  vehicle: SDK.VehicleAPI;
  line: SDK.LineAPI;
  producer: SDK.ProducerAPI;
}

declare namespace SDK {
  export interface Options {
    base?: string;
    token?: string;
  }

  export interface VehicleAPI {
    /**
     * List all vehicles
     */
    listVehicles(req: ListVehiclesRequest): Promise<ListVehiclesResponse>;
    /**
     * Create a vehicle
     */
    createVehicle(req: CreateVehicleRequest): Promise<CreateVehicleResponse>;
    /**
     * Get vehicle by vin(id)
     */
    getVehicle(req: GetVehicleRequest): Promise<GetVehicleResponse>;
    /**
     * Update a vehicle by id
     */
    updateVehicle(req: UpdateVehicleRequest): Promise<UpdateVehicleResponse>;
    /**
     *
     */
    deleteVehicle(req: DeleteVehicleRequest): Promise<DeleteVehicleResponse>;
  }
  export interface LineAPI {
    /**
     * List all lines
     */
    listLines(req: ListLinesRequest): Promise<ListLinesResponse>;
    /**
     * Create a line
     */
    createLine(req: CreateLineRequest): Promise<CreateLineResponse>;
    /**
     * Get line by id
     */
    getLine(req: GetLineRequest): Promise<GetLineResponse>;
    /**
     * Update a line by id
     */
    updateLine(req: UpdateLineRequest): Promise<UpdateLineResponse>;
    /**
     * Delete a line by id
     */
    deleteLine(req: DeleteLineRequest): Promise<DeleteLineResponse>;
  }
  export interface ProducerAPI {
    /**
     * 返回生产商列表
     */
    listProducers(req: ListProducersRequest): Promise<ListProducersResponse>;
  }

  type ListVehiclesRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: number;

      filter: {
        line?: string;
        producer?: string;
        model?: string;
        modelBrief?: string;
        no: {
          $regex?: string;
        };
        vin?: string;
        plate: {
          $regex?: string;
        };
        ns: {
          $regex?: string;
        };
      };
    };
  };

  type ListVehiclesResponse = {
    body: Array<Vehicle>;
    headers: {
      xTotalCount: number;
    };
  };

  type CreateVehicleRequest = {
    body: Vehicle;
  };

  type CreateVehicleResponse = {
    body: Vehicle;
  };

  type GetVehicleRequest = {
    vehicleId: string;
  };

  type GetVehicleResponse = {
    body: Vehicle;
  };

  type UpdateVehicleRequest = {
    vehicleId: string;
    body: Vehicle;
  };

  type UpdateVehicleResponse = {
    body: Vehicle;
  };

  type DeleteVehicleRequest = {
    vehicleId: string;
  };

  type ListLinesRequest = {
    query: {
      limit?: number;
      offset?: string;
      select?: number;

      filter: {
        ns: {
          $regex?: string;
        };
      };
    };
  };

  type ListLinesResponse = {
    body: Array<Line>;
    headers: {
      xTotalCount: string;
    };
  };

  type CreateLineRequest = {
    body: LineCreateBody;
  };

  type CreateLineResponse = {
    body: Line;
  };

  type GetLineRequest = {
    lineId: string;
  };

  type GetLineResponse = {
    body: Line;
  };

  type UpdateLineRequest = {
    lineId: string;
    body: LineUpdateBody;
  };

  type UpdateLineResponse = {
    body: Line;
  };

  type DeleteLineRequest = {
    lineId: string;
  };

  type ListProducersResponse = {
    body: Array<Producer>;
  };

  type Vehicle = {
    id: string;
    createdAt: string;
    updatedAt: string;
    brands: string;
    capacity: number;
    engineNo: string;
    iccid: string;
    length: number;
    lifeYear: number;
    line: string;
    model: string;
    modelBrief: string;
    modified: boolean;
    no: string;
    photos: Array<string>;
    place: string;
    plate: string;
    plateAt: string;
    powerBy: string;
    producer: string;
    purchaseAt: string;
    remark: string;
    scrapped: boolean;
    seats: number;
    type: string;
    validTill: string;
    ns: string;
  };

  type GeoLocation = {
    lng: number;
    lat: number;
  };

  type LineCreateBody = {
    name: string;
    stations: Array<{
      name: string;
      location: {
        lng: number;
        lat: number;
      };
    }>;
    ns: Array<string>;
  };

  type LineUpdateBody = {
    stations: Array<{
      name: string;
      location: {
        lng: number;
        lat: number;
      };
    }>;
    ns: Array<string>;
  };

  type Line = {
    id: string;
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    deletedAt: string;
    description: string;
    name: string;
    stations: Array<{
      name: string;
      location: {
        lng: number;
        lat: number;
      };
    }>;
    ns: string;
  };

  type Station = {
    name: string;
    location: {
      lng: number;
      lat: number;
    };
  };

  type Producer = {
    name: string;
    modelBirefs: string;
    models: string;
  };

  type Err = {
    code: string;
    message: string;
  };
}
