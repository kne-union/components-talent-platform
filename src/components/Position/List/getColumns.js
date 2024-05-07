const getColumns = () => {
  return [
    {
      name: 'name',
      title: '职位名称',
      type: 'mainInfo'
    },
    {
      name: 'status',
      title: '职位状态',
      type: 'tag'
    },
    {
      name: 'currentStage',
      title: '最高进展',
      type: 'tag'
    },
    {
      name: 'companyName',
      title: '公司名称',
      type: 'other'
    },
    {
      name: 'chargedBy',
      title: '职位负责人',
      type: 'contacts'
    },
    {
      name: 'level',
      title: '职位优先级',
      type: 'other'
    },
    {
      name: 'startAt',
      title: '职位开始时间',
      type: 'date'
    },
    {
      name: 'durationDays',
      title: '招聘进展天数',
      type: 'other'
    },
    {
      name: 'expectEndAt',
      title: '职位结束时间',
      type: 'date'
    },
    {
      name: 'number',
      title: '招聘人数',
      type: 'otherSmall'
    },
    {
      name: 'functions',
      title: '职能',
      type: 'other'
    },
    {
      name: 'workplaceCityId',
      title: '工作地址',
      type: 'other'
    },
    {
      name: 'type',
      title: '工作性质',
      type: 'otherSmall'
    },
    {
      name: 'degree',
      title: '学历要求',
      type: 'other'
    },
    {
      name: 'createdBy',
      title: '添加人',
      type: 'user'
    },
    {
      name: 'createdAt',
      title: '添加时间',
      type: 'datetime'
    }
  ];
};

export default getColumns;
