// Libraries
import React, {FC, useContext, useCallback, useState} from 'react'

// Components
import {
  // TechnoSpinner,
  // ComponentSize,
  // RemoteDataState,
  InfluxColors,
  Input,
  List,
  Gradients,
} from '@influxdata/clockface'
// import {BucketContext} from 'src/notebooks/context/buckets'
import {PipeContext} from 'src/notebooks/context/pipe'

type Props = {
  schema: any
}

const MeasurementSelector: FC<Props> = ({schema}) => {
  const {data, update} = useContext(PipeContext)
  // const {buckets, loading} = useContext(BucketContext)
  // TODO(ariel): integrate measurement context
  const [searchTerm, setSearchTerm] = useState('')
  const selected = data.measurement

  const updateSelection = useCallback(
    (value: string): void => {
      let updated = value
      if (updated === selected) {
        updated = ''
      }
      update({measurement: updated, field: '', tags: {}})
    },
    [update]
  )

  // let body

  // if (loading === RemoteDataState.Loading) {
  //   body = (
  //     <div className="data-source--list__empty">
  //       <TechnoSpinner strokeWidth={ComponentSize.Small} diameterPixels={32} />
  //     </div>
  //   )
  // }

  // if (loading === RemoteDataState.Error) {
  //   body = (
  //     <div className="data-source--list__empty">
  //       <p>Could not fetch schema</p>
  //     </div>
  //   )
  // }

  // if (loading === RemoteDataState.Done) {
  const body = (
    <List className="data-source--list" backgroundColor={InfluxColors.Obsidian}>
      {schema
        .filter(name => name.includes(searchTerm))
        .map(name => (
          <List.Item
            key={name}
            value={name}
            onClick={() => updateSelection(name)}
            selected={name === selected}
            title={name}
            gradient={Gradients.GundamPilot}
            wrapText={true}
          >
            <List.Indicator type="dot" />
            {name}
          </List.Item>
        ))}
    </List>
  )
  // }

  return (
    <div className="data-source--block">
      <div className="data-source--block-title">Measurement</div>
      <Input
        value={searchTerm}
        placeholder="Search for a measurement"
        className="tag-selector--search"
        onChange={e => setSearchTerm(e.target.value)}
      />
      {body}
    </div>
  )
}

export default MeasurementSelector
