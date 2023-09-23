import styled from 'styled-components'
import { View, adminViewInfosWrapper } from '@/utils/styles/globals'

export const Account = styled(View)`
  display: flex;
  justify-content: center;
  padding: 20px;
`

export const AccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  width: 100%;
  max-width: ${adminViewInfosWrapper};
  height: fit-content;

  /* border: 1px solid red; */
`

// export const CompanyInfos = styled.div`
//   display: flex;
// `
