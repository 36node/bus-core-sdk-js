export = SDK;

declare class SDK {
  constructor(opts?: SDK.Options);

  base: string;
  token: string;
  auth: string;

  command: SDK.CommandAPI;
  event: SDK.EventAPI;
  vehicle: SDK.VehicleAPI;
  line: SDK.LineAPI;
  producer: SDK.ProducerAPI;
  park: SDK.ParkAPI;
  banci: SDK.BanciAPI;
  warning: SDK.WarningAPI;
}

declare namespace SDK {
  export interface Options {
    base?: string;
    token?: string;
  }

  export interface CommandAPI {
    /**
     * Send a command
     */
    sendCommand(req: SendCommandRequest): Promise<SendCommandResponse>;
  }
  export interface EventAPI {
    /**
     * create (external) event
     */
    createEvent(req: CreateEventRequest): Promise<CreateEventResponse>;
  }
  export interface VehicleAPI {
    /**
     * List all vehicles with filters
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
    /**
     * Get statistics for vehicles
     */
    getStatistics(req: GetStatisticsRequest): Promise<GetStatisticsResponse>;
    /**
     * Get statistics for vehicles soh
     */
    getVehicleSohStatistics(
      req: GetVehicleSohStatisticsRequest
    ): Promise<GetVehicleSohStatisticsResponse>;
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
  export interface ParkAPI {
    /**
     * List all parks with filters
     */
    listParks(req: ListParksRequest): Promise<ListParksResponse>;
  }
  export interface BanciAPI {
    /**
     * List all bancis with filters
     */
    listBancis(req: ListBancisRequest): Promise<ListBancisResponse>;
  }
  export interface WarningAPI {
    /**
     * List all warnings
     */
    listWarnings(req: ListWarningsRequest): Promise<ListWarningsResponse>;
    /**
     * 获取车辆最新的warning
     */
    listLatestWarnings(req: ListLatestWarningsRequest): Promise<ListLatestWarningsResponse>;
  }

  type SendCommandRequest = {
    body: Command;
  };

  type SendCommandResponse = {
    body: Command;
  };

  type CreateEventRequest = {
    body: Event;
  };

  type CreateEventResponse = {
    body: Event;
  };

  type ListVehiclesRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: number;
      _exist?: [string];

      filter: {
        onsite?: string;
        at: {
          $gt?: string;
          $lt?: string;
        };
        chargeAt: {
          $gt?: string;
          $lt?: string;
        };
        alertLevel3At: {
          $gt?: string;
          $lt?: string;
        };
        reportedAt: {
          $gt?: string;
          $lt?: string;
        };
        line?: string;
        producer?: string;
        modelBrief?: string;
        num?: string;
        id?: string;
        plate?: string;
        ns?:
          | {
              $regex: string;
            }
          | string;
        loc?: string;
        distance?: number;
        unit?: "km" | "m";
        "overall.status"?: string;
      };
    };
  };

  type ListVehiclesResponse = {
    body: [Vehicle];
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

  type GetStatisticsRequest = {
    query: {
      select?: number;

      filter: {
        line?: string;
        producer?: string;
        ns: {
          $regex?: string;
        };
      };
    };
  };

  type GetStatisticsResponse = {
    body: VehicleStatistics;
  };

  type GetVehicleSohStatisticsRequest = {
    query: {
      group?: string;

      filter: {
        line?: string;
        producer?: string;
        modelBrief?: string;
        ns: {
          $regex?: string;
        };
      };
    };
  };

  type GetVehicleSohStatisticsResponse = {
    body: [VehicleSohStatistics];
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
    body: [Line];
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

  type ListProducersRequest = {
    query: {
      filter: {
        ns: {
          $regex?: string;
        };
      };
    };
  };

  type ListProducersResponse = {
    body: [Producer];
  };

  type ListParksRequest = {
    query: {
      filter: {
        ns?: string;
      };
    };
  };

  type ListParksResponse = {
    body: [Park];
    headers: {
      xTotalCount: string;
    };
  };

  type ListBancisRequest = {
    query: {
      filter: {
        q?: string;
        date?: string;
      };
    };
  };

  type ListBancisResponse = {
    body: [Banci];
    headers: {
      xTotalCount: string;
    };
  };

  type ListWarningsRequest = {
    query: {
      limit?: number;
      offset?: string;
      sort?: string;
      select?: string;

      filter: {
        type?: string;
        ns: {
          $regex?: string;
        };
        warningAt: {
          $gt?: string;
          $lt?: string;
        };
        line?: string;
        plate?: string;
        vehicle?: string;
        vehicleModel?: string;
        vehicleNo?: string;
        vehicleProducer?: string;
      };
    };
  };

  type ListWarningsResponse = {
    body: [Warning];
    headers: {
      xTotalCount: string;
    };
  };

  type ListLatestWarningsRequest = {
    query: {
      limit?: number;
      offset?: string;

      filter: {
        type?: string;
        ns: {
          $regex?: string;
        };
        warningAt: {
          $gt?: string;
          $lt?: string;
        };
        line?: string;
        plate?: string;
        vehicle?: string;
        vehicleModel?: string;
        vehicleNo?: string;
        vehicleProducer?: string;
      };
    };
  };

  type ListLatestWarningsResponse = {
    body: [Warning];
    headers: {
      xTotalCount: string;
    };
  };

  type Command = {
    id: string;
    flag: string;
    command: string;
    vin: string;
    at: string;
    body: {};
  };
  type Event = {
    flag: string;
    event: string;
    vin: string;
    ns: string;
    body: {};
  };
  type Vehicle = {
    id: string;
    ns: string;
    createdAt: string;
    updatedAt: string;
    reportedAt: string;
    beatAt: string;
    loginAt: string;
    logoutAt: string;
    chargeAt: string;
    alertLevel3At: string;
    onsite: boolean;
    online: boolean;
    repairing: boolean;
    brands: string;
    capacity: number;
    no: string;
    emission: "C1" | "C2" | "C3" | "C4" | "C5" | "C6";
    engineNo: string;
    expiredAt: string;
    length: number;
    lifeYear: number;
    line: string;
    model: string;
    modelBrief: string;
    modified: boolean;
    photos: [string];
    place: string;
    plate: string;
    plateAt: string;
    powerBy: "FUEL" | "HYBIRD" | "DUAL-ENERGY" | "PHEV" | "E-REV" | "ELECTRIC";
    producer: string;
    purchasedAt: string;
    remark: string;
    scrapped: boolean;
    seats: number;
    type: string;
    session: string;
    seq: number;
    time: number;
    platform: string;
    command: string;
    at: string;
    sn: number;
    iccid: string;
    alert: {
      maxLevel: number;
      uas: {
        ressChargeOver: boolean;
        motorTemp: boolean;
        highVolMuteStatus: boolean;
        motorControlTemp: boolean;
        dcdcStatus: boolean;
        brake: boolean;
        dcdcTemp: boolean;
        insulation: boolean;
        batteryBadConsistency: boolean;
        ressNotMatch: boolean;
        socJump: boolean;
        socOver: boolean;
        batteryLow: boolean;
        batteryOver: boolean;
        socLow: boolean;
        ressVolLow: boolean;
        ressVolOver: boolean;
        batteryTempOver: boolean;
        tempDiff: boolean;
      };
      ressLen: number;
      ressList: [
        {
          type: number;
          code: number;
          level: number;
        }
      ];
      mortorLen: number;
      mortorList: [
        {
          type: number;
          code: number;
          level: number;
        }
      ];
      engineLen: number;
      engineList: [
        {
          type: number;
          code: number;
          level: number;
        }
      ];
      otherLen: number;
      otherList: [
        {
          type: number;
          code: number;
          level: number;
        }
      ];
    };
    customExt: {
      dataLen: number;
      pressure1: number;
      pressure2: number;
      batteryVoltage: number;
      dcov: number;
      dcoc: number;
      dcTemp: number;
      acTemp: number;
      lftp: number;
      lftt: number;
      rftp: number;
      rftt: number;
      lr1tp: number;
      lr1tt: number;
      lr2tp: number;
      lr2tt: number;
      rr1tp: number;
      rr1tt: number;
      rr2tp: number;
      rr2tt: number;
      cv: number;
      rc: number;
      cp: number;
      totalCharge: number;
      totalDischarge: number;
      instantPower: number;
      bpiRes: number;
      bniRes: number;
      apTemp: number;
      motorContTemp: number;
      airMode: "OFF" | "WIND" | "HEATING" | "REFRIGERATION" | "ABNORMAL";
      airTemp: number;
      insideTemp: number;
      outsideTemp: number;
      middleDoorStatus: "CLOSE" | "OPEN" | "ABNORMAL";
      frontDoorStatus: "CLOSE" | "OPEN" | "ABNORMAL";
      handbrakeStatus: "OFF" | "ON" | "ABNORMAL";
      keyPosition: "OFF" | "ACC" | "ON" | "START";
    };
    extreme: {
      maxVoltageSubSysNo: number;
      maxVoltageSingNo: number;
      maxVoltage: number;
      minVoltageSubSysNo: number;
      minVoltageSingNo: number;
      minVoltage: number;
      maxNtcSubSysNo: number;
      maxNtcNo: number;
      maxNtc: number;
      minNtcSubSysNo: number;
      minNtcNo: number;
      minNtc: number;
    };
    location: {
      state: number;
      lng: number;
      lat: number;
    };
    earthLocation: {
      state: number;
      lng: number;
      lat: number;
    };
    motors: [
      {
        no: number;
        status: "CONSUMPTION" | "GENERATION" | "OFF" | "READY" | "ABNORMAL";
        controlTemp: number;
        speed: number;
        torque: number;
        temp: number;
        voltage: number;
        current: number;
      }
    ];
    overall: {
      powerStatus: "ON" | "OFF" | "OTHER" | "ABNORMAL";
      chargeStatus: "PARK_CHARGING" | "MOVE_CHARGING" | "UNCHARGED" | "CHARGED" | "ABNORMAL";
      mode: "ELECTRIC" | "MIXED" | "FUEL" | "ABNORMAL";
      speed: number;
      mileage: number;
      voltage: number;
      current: number;
      soc: number;
      dcStatus: "ON" | "OFF" | "ABNORMAL";
      shift:
        | "N"
        | "1"
        | "2"
        | "3"
        | "4"
        | "5"
        | "6"
        | "7"
        | "8"
        | "9"
        | "10"
        | "11"
        | "12"
        | "R"
        | "D"
        | "P";
      resistance: number;
      aptv: number;
      brake: number;
    };
    tens: [
      {
        accPedal: number;
        brake: number;
        speed: number;
        totalCurrent: number;
      }
    ];
    adas: [
      {
        accPedal: number;
        brake: number;
        speed: number;
        totalCurrent: number;
        overSpeed: number;
        lateralDistance: number;
        verticalDistance: number;
        relativeVelocity: number;
        wheelWarning: boolean;
        buzzerWarning: boolean;
        pWarning: boolean;
        rWarning: boolean;
        lWarning: boolean;
        cWarning: boolean;
        cmcsLevel: number;
        cmcs: "NORMAL" | "CLOSE" | "ABNORMAL";
        crbs: boolean;
        obstacleType: "VOID" | "PEOPLE" | "VEHICLE";
      }
    ];
  };
  type LineCreateBody = {
    name: string;
    stations: [
      {
        name: string;
        location: {
          state: number;
          lng: number;
          lat: number;
        };
      }
    ];
    ns: [string];
  };
  type LineUpdateBody = {
    stations: [
      {
        name: string;
        location: {
          state: number;
          lng: number;
          lat: number;
        };
      }
    ];
    ns: [string];
  };
  type Line = {
    id: string;
    createdAt: string;
    updatedAt: string;
    description: string;
    name: string;
    stations: [
      {
        name: string;
        location: {
          state: number;
          lng: number;
          lat: number;
        };
      }
    ];
    ns: string;
  };
  type Station = {
    name: string;
    location: {
      state: number;
      lng: number;
      lat: number;
    };
  };
  type Producer = {
    name: string;
    ns: string;
    modelBirefs: string;
    models: string;
  };
  type Alert = {
    maxLevel: number;
    uas: {
      ressChargeOver: boolean;
      motorTemp: boolean;
      highVolMuteStatus: boolean;
      motorControlTemp: boolean;
      dcdcStatus: boolean;
      brake: boolean;
      dcdcTemp: boolean;
      insulation: boolean;
      batteryBadConsistency: boolean;
      ressNotMatch: boolean;
      socJump: boolean;
      socOver: boolean;
      batteryLow: boolean;
      batteryOver: boolean;
      socLow: boolean;
      ressVolLow: boolean;
      ressVolOver: boolean;
      batteryTempOver: boolean;
      tempDiff: boolean;
    };
    ressLen: number;
    ressList: [
      {
        type: number;
        code: number;
        level: number;
      }
    ];
    mortorLen: number;
    mortorList: [
      {
        type: number;
        code: number;
        level: number;
      }
    ];
    engineLen: number;
    engineList: [
      {
        type: number;
        code: number;
        level: number;
      }
    ];
    otherLen: number;
    otherList: [
      {
        type: number;
        code: number;
        level: number;
      }
    ];
  };
  type Park = {
    id: string;
    name: string;
    address: string;
    location: {
      state: number;
      lng: number;
      lat: number;
    };
    ns: string;
  };
  type Fault = {
    type: number;
    code: number;
    level: number;
  };
  type CustomExt = {
    dataLen: number;
    pressure1: number;
    pressure2: number;
    batteryVoltage: number;
    dcov: number;
    dcoc: number;
    dcTemp: number;
    acTemp: number;
    lftp: number;
    lftt: number;
    rftp: number;
    rftt: number;
    lr1tp: number;
    lr1tt: number;
    lr2tp: number;
    lr2tt: number;
    rr1tp: number;
    rr1tt: number;
    rr2tp: number;
    rr2tt: number;
    cv: number;
    rc: number;
    cp: number;
    totalCharge: number;
    totalDischarge: number;
    instantPower: number;
    bpiRes: number;
    bniRes: number;
    apTemp: number;
    motorContTemp: number;
    airMode: "OFF" | "WIND" | "HEATING" | "REFRIGERATION" | "ABNORMAL";
    airTemp: number;
    insideTemp: number;
    outsideTemp: number;
    middleDoorStatus: "CLOSE" | "OPEN" | "ABNORMAL";
    frontDoorStatus: "CLOSE" | "OPEN" | "ABNORMAL";
    handbrakeStatus: "OFF" | "ON" | "ABNORMAL";
    keyPosition: "OFF" | "ACC" | "ON" | "START";
  };
  type Extreme = {
    maxVoltageSubSysNo: number;
    maxVoltageSingNo: number;
    maxVoltage: number;
    minVoltageSubSysNo: number;
    minVoltageSingNo: number;
    minVoltage: number;
    maxNtcSubSysNo: number;
    maxNtcNo: number;
    maxNtc: number;
    minNtcSubSysNo: number;
    minNtcNo: number;
    minNtc: number;
  };
  type GeoLocation = {
    state: number;
    lng: number;
    lat: number;
  };
  type Motor = {
    no: number;
    status: "CONSUMPTION" | "GENERATION" | "OFF" | "READY" | "ABNORMAL";
    controlTemp: number;
    speed: number;
    torque: number;
    temp: number;
    voltage: number;
    current: number;
  };
  type Overall = {
    powerStatus: "ON" | "OFF" | "OTHER" | "ABNORMAL";
    chargeStatus: "PARK_CHARGING" | "MOVE_CHARGING" | "UNCHARGED" | "CHARGED" | "ABNORMAL";
    mode: "ELECTRIC" | "MIXED" | "FUEL" | "ABNORMAL";
    speed: number;
    mileage: number;
    voltage: number;
    current: number;
    soc: number;
    dcStatus: "ON" | "OFF" | "ABNORMAL";
    shift:
      | "N"
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "8"
      | "9"
      | "10"
      | "11"
      | "12"
      | "R"
      | "D"
      | "P";
    resistance: number;
    aptv: number;
    brake: number;
  };
  type Adas = {
    accPedal: number;
    brake: number;
    speed: number;
    totalCurrent: number;
    overSpeed: number;
    lateralDistance: number;
    verticalDistance: number;
    relativeVelocity: number;
    wheelWarning: boolean;
    buzzerWarning: boolean;
    pWarning: boolean;
    rWarning: boolean;
    lWarning: boolean;
    cWarning: boolean;
    cmcsLevel: number;
    cmcs: "NORMAL" | "CLOSE" | "ABNORMAL";
    crbs: boolean;
    obstacleType: "VOID" | "PEOPLE" | "VEHICLE";
  };
  type TenSecond = {
    accPedal: number;
    brake: number;
    speed: number;
    totalCurrent: number;
  };
  type VehicleSohStatistics = {
    key: string;
    count: string;
  };
  type VehicleStatistics = {
    onsiteVehicles: number;
    totalVehicles: number;
    onlineVehicles: number;
    onlineVehiclesToday: number;
    chargeVehicles: number;
    chargeVehiclesToday: number;
    alertLevel3Vehicles: number;
    alertLevel3VehiclesToday: number;
    totalVehiclesMileage: number;
  };
  type Banci = {
    banciSource: "CHONGMING_BANCI" | "SHANGHAI_BANCI";
    vehicle: string;
    ns: string;
    date: string;
    line: string;
    plate: string;
    driverNo: string;
    driverName: string;
    departAt: string;
    arriveAt: string;
    departPlace: string;
    arrivePlace: string;
    mileage: number;
    remark: string;
    type: string;
    sfyy: string;
    ldlx: string;
    sxx: string;
  };
  type Warning = {
    id: string;
    createdAt: string;
    updatedAt: string;
    ns: string;
    frequency: number;
    type: string;
    plate: string;
    abnormalValues: string;
    abnormalLocation: string;
    warningAt: string;
    vehicle: string;
    vehicleModel: string;
    vehicleModelBrief: string;
    vehicleNo: string;
    vehicleProducer: string;
    vehicleMileage: number;
  };
  type Err = {
    name: string;
    code: string;
    message: string;
  };
}
