import { BigNumber, ethers } from "ethers"
import React from "react"
import ProtocolBalanceInput from "../../components/ProtocolBalanceInput/ProtocolBalanceInput"
import useProtocolManager, { COVERED_PROTOCOLS } from "../../hooks/useProtocolManager"
import styles from "./Protocol.module.scss"
import { convertSecondsToDurationString } from "../../utils/time"
import AllowanceGate from "../../components/AllowanceGate/AllowanceGate"
import { Button } from "../../components/Button/Button"
import useERC20 from "../../hooks/useERC20"

export const ProtocolPage: React.FC = () => {
  const [selectedProtocol, setSelectedProtocol] = React.useState<keyof typeof COVERED_PROTOCOLS>("SQUEETH")
  const [balance, setBalance] = React.useState<BigNumber>()
  const [coverageLeft, setCoverageLeft] = React.useState<BigNumber>()
  const [premium, setPremium] = React.useState<BigNumber>()
  const [allowance, setAllowance] = React.useState<BigNumber>()

  /**
   * Amount to add to/remove from active balance
   */
  const [amount, setAmount] = React.useState<BigNumber | null>()

  const { address, getProtocolActiveBalance, getProtocolCoverageLeft, getProtocolPremium, depositActiveBalance } =
    useProtocolManager()
  const { balance: usdcBalance, getAllowance, approve } = useERC20("USDC")

  /**
   * Handler for changing the protocol
   */
  const handleOnProtocolChanged = React.useCallback((e) => {
    setSelectedProtocol(e.target.value)
  }, [])

  /**
   * Add balance to selected protocol
   */
  const handleAddBalance = React.useCallback(async () => {
    if (!amount) {
      return
    }

    await depositActiveBalance(selectedProtocol, amount)
    // TODO: Refresh protocol balance
  }, [amount, selectedProtocol, depositActiveBalance])

  /**
   * Remove balance from selected protocol
   */
  const handleRemoveBalance = React.useCallback(() => {
    if (!amount) {
      return
    }
  }, [amount])

  /**
   * Handle the inputted amount changed event
   */
  const handleOnAmountChanged = React.useCallback((amount: BigNumber | null) => {
    setAmount(amount)
  }, [])

  /**
   * Refresh USDC allowance
   */
  const refreshAllowance = React.useCallback(async () => {
    if (!address) {
      return
    }

    const lastAllowance = await getAllowance(address)
    setAllowance(lastAllowance)
  }, [address, getAllowance])

  /**
   * Approve USDC spending for a inputted amount
   */
  const handleApproveUSDCSpending = React.useCallback(async () => {
    if (!address || !amount) {
      return
    }

    await approve(address, amount)
    refreshAllowance()
  }, [approve, address, amount, refreshAllowance])

  // Fetch protocol coverage information
  React.useEffect(() => {
    async function fetchAsyncData() {
      const protocolBalance = await getProtocolActiveBalance(selectedProtocol)
      setBalance(protocolBalance)

      const protocolCoverageleft = await getProtocolCoverageLeft(selectedProtocol)
      setCoverageLeft(protocolCoverageleft)

      const protocolPremium = await getProtocolPremium(selectedProtocol)
      setPremium(protocolPremium)
    }

    setAmount(null)
    fetchAsyncData()
  }, [selectedProtocol, getProtocolActiveBalance, getProtocolCoverageLeft, getProtocolPremium])

  // Fetch allowance
  React.useEffect(() => {
    if (!address || !!allowance) {
      return
    }

    refreshAllowance()
  }, [address, allowance, refreshAllowance])

  return (
    <div className={styles.container}>
      Protocol:
      <select value={selectedProtocol} onChange={handleOnProtocolChanged}>
        {Object.entries(COVERED_PROTOCOLS).map(([key, protocol]) => (
          <option key={key} value={key}>
            {protocol.name}
          </option>
        ))}
      </select>
      {balance && <p>Active balance: {ethers.utils.formatUnits(balance, 6)} USDC</p>}
      {coverageLeft && <p>Coverage left: {convertSecondsToDurationString(coverageLeft.toNumber())}</p>}
      {balance && (
        <ProtocolBalanceInput onChange={handleOnAmountChanged} protocolPremium={premium} usdcBalance={usdcBalance} />
      )}
      {amount && (
        <>
          <div>
            <AllowanceGate
              amount={amount}
              spender={address}
              allowance={allowance}
              onApprove={handleApproveUSDCSpending}
            >
              <Button onClick={handleAddBalance} disabled={!amount}>
                Add balance {amount?.toString()}
              </Button>
            </AllowanceGate>
          </div>
          <div>
            <Button onClick={handleRemoveBalance}>Remove balance</Button>
          </div>
        </>
      )}
    </div>
  )
}
