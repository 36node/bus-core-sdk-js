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
  weather: SDK.WeatherAPI;
  push: SDK.PushAPI;
  optionalVehicle: SDK.OptionalVehicleAPI;
  chargeRecord: SDK.ChargeRecordAPI;
  qsoh: SDK.QsohAPI;
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
     * Get vehicles stateHistory
     */
    getVehicleStateHistory(
      req: GetVehicleStateHistoryRequest
    ): Promise<GetVehicleStateHistoryResponse>;
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
    /**
     * Get statistics for vehicles air
     */
    getVehicleAirStatistics(
      req: GetVehicleAirStatisticsRequest
    ): Promise<GetVehicleAirStatisticsResponse>;
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
    /**
     * Delete a banci by id
     */
    deleteBanci(req: DeleteBanciRequest): Promise<DeleteBanciResponse>;
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
  export interface WeatherAPI {
    /**
     * Get weather
     */
    getWeather(req: GetWeatherRequest): Promise<GetWeatherResponse>;
    /**
     * Get weather last 24 hours
     */
    getWeatherLast24Hours(
      req: GetWeatherLast24HoursRequest
    ): Promise<GetWeatherLast24HoursResponse>;
  }
  export interface PushAPI {
    /**
     * Get push setting by userId
     */
    getPushSet(req: GetPushSetRequest): Promise<GetPushSetResponse>;
    /**
     * Update push setting
     */
    updatePushSet(req: UpdatePushSetRequest): Promise<UpdatePushSetResponse>;
    /**
     * Get push device by userId
     */
    getPushDevice(req: GetPushDeviceRequest): Promise<GetPushDeviceResponse>;
    /**
     * Update device
     */
    updatePushDevice(req: UpdatePushDeviceRequest): Promise<UpdatePushDeviceResponse>;
    /**
     * List all setting
     */
    listPushSet(req: ListPushSetRequest): Promise<ListPushSetResponse>;
    /**
     * List all devices
     */
    listPushDevice(req: ListPushDeviceRequest): Promise<ListPushDeviceResponse>;
  }
  export interface OptionalVehicleAPI {
    /**
     * List all optional vehicles with filters
     */
    listOptionalVehicles(req: ListOptionalVehiclesRequest): Promise<ListOptionalVehiclesResponse>;
    /**
     * Delete a optional vehicle by id
     */
    deleteOptionalVehicle(
      req: DeleteOptionalVehicleRequest
    ): Promise<DeleteOptionalVehicleResponse>;
  }
  export interface ChargeRecordAPI {
    /**
     * List all chargeRecords with filters
     */
    listChargeRecords(req: ListChargeRecordsRequest): Promise<ListChargeRecordsResponse>;
  }
  export interface QsohAPI {
    /**
     * List all qSohs with filters
     */
    listQSohs(req: ListQSohsRequest): Promise<ListQSohsResponse>;
    /**
     * upsert qsoh by vehicle &amp; date
     */
    upsertQSoh(req: UpsertQSohRequest): Promise<UpsertQSohResponse>;
    /**
     * Get qsoh by id
     */
    getQSoh(req: GetQSohRequest): Promise<GetQSohResponse>;
    /**
     *
     */
    deleteQSoh(req: DeleteQSohRequest): Promise<DeleteQSohResponse>;
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
        repairWorkshop?: string;
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

  type GetVehicleStateHistoryRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: number;

      filter: {
        at: {
          $gt?: string;
          $lt?: string;
        };
      };
    };
  };

  type GetVehicleStateHistoryResponse = {
    body: VehicleStateHistory;
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

  type GetVehicleAirStatisticsRequest = {
    query: {
      filter: {
        ns: {
          $regex: string;
        };
      };
    };
  };

  type GetVehicleAirStatisticsResponse = {
    body: VehicleAirStatistics;
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

  type DeleteBanciRequest = {
    banciId: string;
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

  type GetWeatherRequest = {
    date: string;

    query: {
      filter: {
        location?: string;
      };
    };
  };

  type GetWeatherResponse = {
    body: [Weather];
  };

  type GetWeatherLast24HoursRequest = {
    query: {
      filter: {
        location?: string;
      };
    };
  };

  type GetWeatherLast24HoursResponse = {
    body: [Weather];
  };

  type GetPushSetRequest = {
    userId: string;

    query: {
      filter: {
        rootNs: string;
      };
    };
  };

  type GetPushSetResponse = {
    body: PushSet;
  };

  type UpdatePushSetRequest = {
    userId: string;
    body: PushSetUpdateBody;
  };

  type UpdatePushSetResponse = {
    body: PushSet;
  };

  type GetPushDeviceRequest = {
    userId: string;

    query: {
      filter: {
        rootNs: string;
        registrationId: string;
      };
    };
  };

  type GetPushDeviceResponse = {
    body: PushDevice;
  };

  type UpdatePushDeviceRequest = {
    userId: string;
    body: PushDeviceUpdateBody;
  };

  type UpdatePushDeviceResponse = {
    body: PushDevice;
  };

  type ListPushSetRequest = {
    query: {
      limit?: number;
      offset?: string;
      select?: number;

      filter: {
        userId?: string;
        rootNs?: string;
      };
    };
  };

  type ListPushSetResponse = {
    body: [PushSet];
    headers: {
      xTotalCount: string;
    };
  };

  type ListPushDeviceRequest = {
    query: {
      limit?: number;
      offset?: string;
      select?: number;

      filter: {
        userId?: string;
        rootNs?: string;
        registrationId?: string;
      };
    };
  };

  type ListPushDeviceResponse = {
    body: [PushDevice];
    headers: {
      xTotalCount: string;
    };
  };

  type ListOptionalVehiclesRequest = {
    query: {
      sort?: string;
    };
  };

  type ListOptionalVehiclesResponse = {
    body: [OptionalVehicle];
    headers: {
      xTotalCount: string;
    };
  };

  type DeleteOptionalVehicleRequest = {
    vehicleId: string;
  };

  type ListChargeRecordsRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: number;

      filter: {
        startAt: {
          $gte?: string;
          $lte?: string;
        };
        endAt: {
          $gt?: string;
          $lt?: string;
        };
        line?: string;
        producer?: string;
        modelBrief?: string;
        no?: string;
        plate?: string;
        ns?:
          | {
              $regex: string;
            }
          | string;
        period?: string;
      };
    };
  };

  type ListChargeRecordsResponse = {
    body: [ChargeRecord];
    headers: {
      xTotalCount: number;
    };
  };

  type ListQSohsRequest = {
    query: {
      limit?: number;
      offset?: number;
      sort?: string;
      select?: number;

      filter: {
        date: {
          $gte?: string;
          $lte?: string;
        };
        platedAt: {
          $gte?: string;
          $lte?: string;
        };
        soh: {
          $gte?: number;
          $lte?: number;
        };
        line?: string;
        producer?: string;
        modelBrief?: string;
        no?: string;
        plate?: string;
        ns?:
          | {
              $regex: string;
            }
          | string;
        vehicle?: string;
        labels?: string;
      };
    };
  };

  type ListQSohsResponse = {
    body: [QSoh];
    headers: {
      xTotalCount: number;
    };
  };

  type UpsertQSohRequest = {
    body: QSohRequestBody;
  };

  type UpsertQSohResponse = {
    body: QSoh;
  };

  type GetQSohRequest = {
    qsohId: string;
  };

  type GetQSohResponse = {
    body: QSoh;
  };

  type DeleteQSohRequest = {
    qsohId: string;
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
  type ChargeRecord = {
    vehicle: string;
    ns: string;
    line: string;
    modelBrief: string;
    producer: string;
    plate: string;
    labels: [string];
    no: string;
    startAt: string;
    endAt: string;
    duration: string;
    startSoc: string;
    endSoc: string;
    period: "HIGH" | "LOW" | "NORMAL";
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
    labels: [string];
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
    platedAt: string;
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
    repairWorkshop: string;
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
  type VehicleAirStatistics = {
    airOpenCount: number;
    averageInsideTemp: number;
    airOpenRatio: number;
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
  type OptionalVehicle = {
    id: string;
    ns: string;
    optionalNs: string;
    newDepartment: string;
    line: string;
    optionalLine: string;
    newLine: string;
    plate: string;
    banci: string;
    labels: [string];
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
  type Weather = {
    text: string;
    code: string;
    temperature: number;
    humidity: number;
    lastUpdated: string;
    date: string;
    text_day: string;
    code_day: string;
    text_night: string;
    code_night: string;
    high: string;
    low: string;
    high_humidity: string;
    low_humidity: string;
    wind_direction: string;
    wind_direction_degree: string;
    wind_speed: string;
  };
  type VehicleStateHistory = {
    running: string;
    charging: string;
    stop: string;
    at: string;
    hour: string;
  };
  type Err = {
    name: string;
    code: string;
    message: string;
  };
  type PushSetUpdateBody = {
    id: string;
    rootNs: string;
    ns: string;
    level1: boolean;
    level2: boolean;
    level3: boolean;
  };
  type PushSet = {
    id: string;
    rootNs: string;
    ns: string;
    userId: string;
    level1: boolean;
    level2: boolean;
    level3: boolean;
    createdAt: string;
    updatedAt: string;
  };
  type PushDeviceUpdateBody = {
    rootNs: string;
    ns: string;
    registrationId: string;
  };
  type PushDevice = {
    id: string;
    rootNs: string;
    ns: string;
    userId: string;
    registrationId: string;
    createdAt: string;
    updatedAt: string;
  };
  type QSohRequestBody = {
    vehicle: string;
    soh: number;
    date: string;
  };
  type QSoh = {
    id: string;
    vehicle: string;
    soh: number;
    key: string;
    date: string;
    producer: string;
    ns: string;
    brands: string;
    no: string;
    line: string;
    model: string;
    modelBrief: string;
    plate: string;
    platedAt: string;
    createdAt: string;
    updatedAt: string;
    labels: [string];
  };
}
