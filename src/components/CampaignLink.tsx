import { Link, type LinkProps } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { pathWithCampaign } from '../lib/campaignAttribution'

export function CampaignLink({ to, ...rest }: LinkProps) {
  const { attribution } = useApp()
  const dest = typeof to === 'string' ? pathWithCampaign(to, attribution) : to
  return <Link to={dest} {...rest} />
}
