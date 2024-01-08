// 把文件按照二进制进行读取
export function readFile (file) {
  return new Promise(resolve => {
    let reader = new FileReader()
    reader.readAsBinaryString(file) // 把当前文件以二进制进行读取
    reader.onload = ev => {
      resolve(ev.target.result)
    }
  })
}

// 字段对应表
export let character = {
  aluName: {
    text: '姓名',
    type: 'string'
  },
  aluId: {
    text: '学号',
    type: 'string'
  },
  gender: {
    text: '性别',
    type: 'string'
  },
  idCard: {
    text: '身份证号',
    type: 'string'
  },
  nationality: {
    text: '民族',
    type: 'string'
  },
  politicalStatus: {
    text: '政治面貌',
    type: 'string'
  },
  nativePlace: {
    text: '籍贯',
    type: 'string'
  },
  clazz: {
    text: '班级',
    type: 'string'
  },
  admissionTime: {
    text: '入学时间',
    type: 'string'
  },
  graduationTime: {
    text: '毕业时间',
    type: 'string'
  },
  major: {
    text: '专业',
    type: 'string'
  },
  degreeStage: {
    text: '阶段',
    type: 'string'
  },
  phoneNum: {
    text: '手机',
    type: 'string'
  },
  city: {
    text: '所在城市',
    type: 'string'
  },
  workUnit: {
    text: '工作单位',
    type: 'string'
  },
  jobTitle: {
    text: '担任职务',
    type: 'string'
  },
  enterpriseProperty: {
    text: '企业性质',
    type: 'string'
  },
  note: {
    text: '备注',
    type: 'string'
  },
  email: {
    text: '邮箱',
    type: 'string'
  }
}

// 设置异步延迟间隔
export function delay (interval = 0) {
  return new Promise(resolve => {
    let timer = setTimeout(_ => {
      clearTimeout(timer)
      resolve()
    }, interval)
  })
}

// 时间字符串格式化
export function formatDate (date) {
  const formattedDate = date.toLocaleDateString() // 使用默认的本地化日期格式
  return formattedDate
}

// 性别转化
export function exGender (gender) {
  const genderValue = gender === '男' ? 0 : 1
  return genderValue
}
// 阶段转化
export function exDegree (degree) {
  let degreeValue

  if (degree === '本科') {
    degreeValue = 0
  } else if (degree === '硕士') {
    degreeValue = 1
  } else if (degree === '博士') {
    degreeValue = 2
  } else {
    degreeValue = 0
  }

  return degreeValue
}

// 时间转化
export function convertToDate (excelTimestamp) {
  const excelBaseDate = new Date(1900, 0, 1) // Excel 的基准日期
  const date = new Date(excelBaseDate.getTime() + (excelTimestamp - 1) * 24 * 60 * 60 * 1000) // 这里new了一个Date对象
  return date
}

// export function convertToDate (dateString) {
//   const parts = dateString.split('.')
//   if (parts.length === 3) {
//     const year = parseInt(parts[0], 10)
//     const month = parseInt(parts[1], 10) - 1 // 月份需要减 1
//     const day = parseInt(parts[2], 10)
//     return new Date(year, month, day)
//   }
//   // 如果无法解析为指定格式，则返回 null 或者根据需求进行处理
//   return null
// }
