/**
 * Network Status Utility
 *
 * Provides utilities for detecting online/offline status
 * and managing network state in the application.
 */

class NetworkStatusManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.listeners = [];
    this.setupEventListeners();
  }

  /**
   * Setup event listeners for online/offline events
   */
  setupEventListeners() {
    window.addEventListener("online", this.handleOnline.bind(this));
    window.addEventListener("offline", this.handleOffline.bind(this));

    // Also check for network connectivity changes
    if ("connection" in navigator) {
      navigator.connection.addEventListener(
        "change",
        this.handleConnectionChange.bind(this),
      );
    }
  }

  /**
   * Handle online event
   */
  handleOnline() {
    this.isOnline = true;
    this.notifyListeners({ isOnline: true, timestamp: Date.now() });
    console.log("Network: Online");
  }

  /**
   * Handle offline event
   */
  handleOffline() {
    this.isOnline = false;
    this.notifyListeners({ isOnline: false, timestamp: Date.now() });
    console.log("Network: Offline");
  }

  /**
   * Handle connection change event
   */
  handleConnectionChange() {
    const connection = navigator.connection;
    const effectiveType = connection?.effectiveType;
    const downlink = connection?.downlink;

    console.log(
      `Network connection changed: ${effectiveType}, downlink: ${downlink}Mbps`,
    );

    this.notifyListeners({
      isOnline: this.isOnline,
      effectiveType,
      downlink,
      timestamp: Date.now(),
    });
  }

  /**
   * Get current online status
   */
  getOnlineStatus() {
    return this.isOnline;
  }

  /**
   * Get detailed connection information
   */
  getConnectionInfo() {
    const connection = navigator.connection;
    return {
      isOnline: this.isOnline,
      effectiveType: connection?.effectiveType || "unknown",
      downlink: connection?.downlink || 0,
      rtt: connection?.rtt || 0,
      saveData: connection?.saveData || false,
    };
  }

  /**
   * Check if connection is slow
   */
  isSlowConnection() {
    const connection = navigator.connection;
    if (!connection) return false;

    const slowTypes = ["slow-2g", "2g"];
    return (
      slowTypes.includes(connection.effectiveType) || connection.downlink < 1
    );
  }

  /**
   * Add listener for network status changes
   */
  addListener(callback) {
    this.listeners.push(callback);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback,
      );
    };
  }

  /**
   * Notify all listeners of status change
   */
  notifyListeners(status) {
    this.listeners.forEach((callback) => {
      try {
        callback(status);
      } catch (error) {
        console.error("Error in network status listener:", error);
      }
    });
  }

  /**
   * Test network connectivity by attempting a fetch
   */
  async testConnectivity(timeout = 5000) {
    if (!this.isOnline) {
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch("https://www.google.com/favicon.ico", {
        method: "HEAD",
        mode: "no-cors",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return true;
    } catch (error) {
      console.log("Connectivity test failed:", error.message);
      return false;
    }
  }

  /**
   * Get network speed estimate
   */
  getNetworkSpeed() {
    const connection = navigator.connection;
    if (!connection) return "unknown";

    const effectiveType = connection.effectiveType;
    const downlink = connection.downlink;

    if (effectiveType === "slow-2g") return "very_slow";
    if (effectiveType === "2g") return "slow";
    if (effectiveType === "3g") return "medium";
    if (effectiveType === "4g" && downlink > 10) return "fast";
    if (effectiveType === "4g") return "medium_fast";

    return "unknown";
  }

  /**
   * Check if API calls should be avoided due to network conditions
   */
  shouldUseOfflineMode() {
    if (!this.isOnline) return true;

    const connection = navigator.connection;
    if (!connection) return false;

    // Use offline mode for very slow connections
    return (
      connection.effectiveType === "slow-2g" ||
      (connection.saveData && connection.downlink < 0.5)
    );
  }

  /**
   * Get human-readable network status
   */
  getNetworkStatusText() {
    if (!this.isOnline) {
      return "Offline";
    }

    const speed = this.getNetworkSpeed();
    const speedTexts = {
      very_slow: "Online (Very Slow)",
      slow: "Online (Slow)",
      medium: "Online (Medium)",
      medium_fast: "Online (Good)",
      fast: "Online (Fast)",
      unknown: "Online",
    };

    return speedTexts[speed] || "Online";
  }

  /**
   * Cleanup event listeners
   */
  cleanup() {
    window.removeEventListener("online", this.handleOnline.bind(this));
    window.removeEventListener("offline", this.handleOffline.bind(this));

    if ("connection" in navigator) {
      navigator.connection.removeEventListener(
        "change",
        this.handleConnectionChange.bind(this),
      );
    }

    this.listeners = [];
  }
}

// Create singleton instance
const networkStatusManager = new NetworkStatusManager();

// React hook for using network status (to be imported in components)
export const createNetworkStatusHook = () => {
  // This will be used in React components with proper React import
  return {
    getStatus: () => ({
      isOnline: networkStatusManager.getOnlineStatus(),
      ...networkStatusManager.getConnectionInfo(),
      shouldUseOfflineMode: networkStatusManager.shouldUseOfflineMode(),
      isSlowConnection: networkStatusManager.isSlowConnection(),
      networkSpeed: networkStatusManager.getNetworkSpeed(),
      statusText: networkStatusManager.getNetworkStatusText(),
      testConnectivity:
        networkStatusManager.testConnectivity.bind(networkStatusManager),
    }),
    addListener: networkStatusManager.addListener.bind(networkStatusManager),
  };
};

// Utility functions
export const isOnline = () => networkStatusManager.getOnlineStatus();
export const isOffline = () => !networkStatusManager.getOnlineStatus();
export const shouldUseOfflineMode = () =>
  networkStatusManager.shouldUseOfflineMode();
export const getNetworkSpeed = () => networkStatusManager.getNetworkSpeed();
export const testConnectivity = (timeout) =>
  networkStatusManager.testConnectivity(timeout);

export default networkStatusManager;
