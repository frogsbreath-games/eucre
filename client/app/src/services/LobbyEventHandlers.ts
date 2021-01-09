import { ChatMessage } from "app/types/ChatMessage";

export interface LobbyEventHandlers {
  chatSent: (chat: ChatMessage) => void;
}
