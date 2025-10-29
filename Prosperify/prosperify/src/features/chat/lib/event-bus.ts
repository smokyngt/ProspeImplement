type EventCallback<T = unknown> = (data: T) => void

class EventBus {
  private events: Map<string, EventCallback<unknown>[]> = new Map()

  on<T = unknown>(event: string, callback: EventCallback<T>) {
    if (!this.events.has(event)) {
      this.events.set(event, [])
    }
  this.events.get(event)!.push(callback as EventCallback<unknown>)
  }

  off<T = unknown>(event: string, callback: EventCallback<T>) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      const idx = callbacks.findIndex((cb) => cb === (callback as unknown as EventCallback<unknown>))
      if (idx > -1) {
        callbacks.splice(idx, 1)
      }
    }
  }

  emit<T = unknown>(event: string, data?: T) {
    const callbacks = this.events.get(event)
    if (callbacks) {
      callbacks.forEach((callback) => (callback as EventCallback<T>)(data as T))
    }
  }

  clear() {
    this.events.clear()
  }
}

export const eventBus = new EventBus()
